FROM tensorflow/tensorflow:latest

WORKDIR /app
COPY * .
# RUN source venv/bin/activate.sh
RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "app.server:app", "--host", "0.0.0.0", "--port", "80"]
EXPOSE 80
