import os
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError
from bson import ObjectId
from deepface import DeepFace

from database import users_collection
from auth_utils import hash_password, verify_password, create_token, SECRET_KEY, ALGORITHM

# ---------------- APP ----------------
app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DIRECTORIES ----------------
UPLOAD_DIR = "uploads"
FACE_DB = "face_db"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(FACE_DB, exist_ok=True)

# ---------------- FACE UTILS ----------------
def get_embedding(image_path):
    try:
        emb = DeepFace.represent(
            img_path=image_path,
            model_name="Facenet",
            enforce_detection=True
        )
        return np.array(emb[0]["embedding"])
    except Exception:
        return None

# ---------------- AUTH HELPER ----------------
async def get_current_user(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")

        user = await users_collection.find_one(
            {"_id": ObjectId(user_id)}
        )

        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ================= AUTH APIs =================

@app.post("/register")
async def register(email: str, password: str):
    existing = await users_collection.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = {
        "email": email,
        "hashed_password": hash_password(password)
    }

    result = await users_collection.insert_one(user)

    return {
        "status": "USER REGISTERED",
        "id": str(result.inserted_id)
    }

@app.post("/login")
async def login(email: str, password: str):
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    if not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid password")

    token = create_token({
        "user_id": str(user["_id"]),
        "email": user["email"]
    })

    return {
        "access_token": token,
        "user": {
            "id": str(user["_id"]),
            "email": user["email"]
        }
    }

# ================= REGISTER FACE =================

@app.post("/register-face")
async def register_face(
    file: UploadFile = File(...),
    authorization: str = Header(...)
):
    token = authorization.replace("Bearer ", "")
    user = await get_current_user(token)

    img_path = os.path.join(
        UPLOAD_DIR, f"user_{user['_id']}.jpg"
    )

    with open(img_path, "wb") as f:
        f.write(await file.read())

    embedding = get_embedding(img_path)
    if embedding is None:
        return {"status": "FACE NOT DETECTED"}

    np.save(
        os.path.join(FACE_DB, f"user_{user['_id']}.npy"),
        embedding
    )

    return {"status": "FACE REGISTERED"}

# ================= FACE LOGIN =================

@app.post("/login-face")
async def login_face(file: UploadFile = File(...)):
    img_path = os.path.join(UPLOAD_DIR, "login.jpg")

    with open(img_path, "wb") as f:
        f.write(await file.read())

    new_embedding = get_embedding(img_path)
    if new_embedding is None:
        return {"status": "FACE NOT DETECTED"}

    best_user = None
    best_distance = float("inf")

    for fname in os.listdir(FACE_DB):
        if fname.endswith(".npy"):
            uid = fname.replace("user_", "").replace(".npy", "")
            saved_embedding = np.load(
                os.path.join(FACE_DB, fname)
            )

            dist = np.linalg.norm(saved_embedding - new_embedding)
            if dist < best_distance:
                best_distance = dist
                best_user = uid

    if best_user and best_distance < 6:
        user = await users_collection.find_one(
            {"_id": ObjectId(best_user)}
        )

        token = create_token({
            "user_id": str(user["_id"]),
            "email": user["email"]
        })

        return {
            "status": "LOGIN SUCCESS",
            "access_token": token,
            "user": {
                "id": str(user["_id"]),
                "email": user["email"]
            }
        }

    return {"status": "LOGIN FAILED"}