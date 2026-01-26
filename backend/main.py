import os
import numpy as np
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
FACE_DB = "face_db"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(FACE_DB, exist_ok=True)

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
        print("❌🙅 Face detection error:", e)
        return None

@app.post("/register-face")
async def register_face(file: UploadFile = File(...)):
    img_path = os.path.join(UPLOAD_DIR, "register.jpg")
    with open(img_path, "wb") as f:
        f.write(await file.read())

    embedding = get_embedding(img_path)
    if embedding is None:
        return {"status": "FACE NOT DETECTED"}

    np.save(os.path.join(FACE_DB, "user.npy"), embedding)
    return {"status": "FACE REGISTERED"}

@app.post("/login-face")
async def login_face(file: UploadFile = File(...)):
    img_path = os.path.join(UPLOAD_DIR, "login.jpg")
    with open(img_path, "wb") as f:
        f.write(await file.read())

    if not os.path.exists(os.path.join(FACE_DB, "user.npy")):
        return {"status": "NO FACE REGISTERED"}

    saved_embedding = np.load(os.path.join(FACE_DB, "user.npy"))
    new_embedding = get_embedding(img_path)

    if new_embedding is None:
        return {"status": "FACE NOT DETECTED"}

    distance = np.linalg.norm(saved_embedding - new_embedding)
    print("📏 Face distance:", distance)

    if distance < 6.0:
        return {"status": "LOGIN SUCCESS"}
    else:
        return {"status": "LOGIN FAILED"}
