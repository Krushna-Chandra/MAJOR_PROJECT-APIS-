import os
import numpy as np
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from deepface import DeepFace
from jose import jwt, JWTError

from database import SessionLocal, engine
from models import Base, User
from auth_utils import hash_password, verify_password, create_token, SECRET_KEY, ALGORITHM

# ---------- APP ----------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- DB ----------
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- DIRS ----------
UPLOAD_DIR = "uploads"
FACE_DB = "face_db"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(FACE_DB, exist_ok=True)

# ---------- FACE UTILS ----------
def get_embedding(image_path):
    try:
        emb = DeepFace.represent(
            img_path=image_path,
            model_name="Facenet",
            enforce_detection=True
        )
        if not emb or "embedding" not in emb[0]:
            return None
        return np.array(emb[0]["embedding"])
    except Exception as e:
        print("Face error:", e)
        return None

# ---------- JWT UTILS ----------
def get_current_user(token: str, db: Session):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ===========================
# ✅ AUTH APIs
# ===========================

@app.post("/register")
def register(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if user:
        raise HTTPException(400, "User already exists")

    new_user = User(
        email=email,
        hashed_password=hash_password(password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"status": "USER REGISTERED"}

@app.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(400, "User not found")

    if not verify_password(password, user.hashed_password):
        raise HTTPException(400, "Invalid password")

    token = create_token({"user_id": user.id, "email": user.email})

    return {
        "access_token": token,
        "user": {
            "id": user.id,
            "email": user.email
        }
    }

# ===========================
# ✅ REGISTER FACE (LOGGED IN USER)
# ===========================

@app.post("/register-face")
async def register_face(
    file: UploadFile = File(...),
    authorization: str = Header(...),
    db: Session = Depends(get_db)
):
    token = authorization.replace("Bearer ", "")
    user = get_current_user(token, db)

    img_path = os.path.join(UPLOAD_DIR, f"register_{user.id}.jpg")
    with open(img_path, "wb") as f:
        f.write(await file.read())

    embedding = get_embedding(img_path)
    if embedding is None:
        return {"status": "FACE NOT DETECTED"}

    np.save(os.path.join(FACE_DB, f"user_{user.id}.npy"), embedding)

    return {"status": "FACE REGISTERED FOR USER"}

# ===========================
# ✅ FACE LOGIN (FIND USER)
# ===========================

@app.post("/login-face")
async def login_face(file: UploadFile = File(...), db: Session = Depends(get_db)):
    img_path = os.path.join(UPLOAD_DIR, "login.jpg")
    with open(img_path, "wb") as f:
        f.write(await file.read())

    new_embedding = get_embedding(img_path)
    if new_embedding is None:
        return {"status": "FACE NOT DETECTED"}

    best_match_user = None
    best_distance = float("inf")

    for filename in os.listdir(FACE_DB):
        if filename.startswith("user_") and filename.endswith(".npy"):
            user_id = int(filename.replace("user_", "").replace(".npy", ""))
            saved_embedding = np.load(os.path.join(FACE_DB, filename))

            distance = np.linalg.norm(saved_embedding - new_embedding)

            if distance < best_distance:
                best_distance = distance
                best_match_user = user_id

    print("Best distance:", best_distance)

    if best_match_user is not None and best_distance < 6.0:
        user = db.query(User).filter(User.id == best_match_user).first()
        if not user:
            return {"status": "USER NOT FOUND"}

        token = create_token({"user_id": user.id, "email": user.email})

        return {
            "status": "LOGIN SUCCESS",
            "access_token": token,
            "user": {
                "id": user.id,
                "email": user.email
            }
        }

    return {"status": "LOGIN FAILED"}
