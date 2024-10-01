FROM tensorflow/tensorflow:latest

WORKDIR /app
COPY * .
# RUN source venv/bin/activate.sh
RUN pip install --no-cache-dir -r requirements.txt

CMD ["fastapi", "run", "server.py"]

EXPOSE 8000:8000
