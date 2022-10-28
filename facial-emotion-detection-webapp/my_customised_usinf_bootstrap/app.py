from flask import Flask, render_template, request
import cv2
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1


@app.route('/')
def index():
    return render_template(r'index.html')


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    img = request.files['face']
    img.save(r'file.jpeg')

    img = cv2.imread(r'file.jpeg')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt2.xml')
    faces = cascade.detectMultiScale(gray, 1.1, 3)

    for x, y, w, h in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cropped = img[y:y+h, x:x+w]
        cv2.imwrite(r'after.jpeg', img)

    try:
        cv2.imwrite(r'cropped.jpeg', cropped)

    except:
        pass

    #####################################

    try:
        image = cv2.imread(r'cropped.jpeg', 0)
    except:
        image = cv2.imread(r'file.jpeg', 0)

    image = cv2.resize(image, (48, 48))

    # image = image/255.0

    image = np.reshape(image, (1, 48, 48, 1))

    model = load_model(r'model_3.h5')

    prediction = model.predict(image)

    label_map = ['Neutral', 'Happy', 'Sad']

    prediction = np.argmax(prediction)

    final_prediction = label_map[prediction]

    return render_template(r'predict.html', data=final_prediction)


if __name__ == "__main__":
    app.run(debug=True)
