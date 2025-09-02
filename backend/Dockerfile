# Use an official lightweight Python image as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies required for Tesseract OCR
# This is the equivalent of your apt.txt file
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
# --no-cache-dir ensures the image is smaller
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run your app using Gunicorn with optimized settings
# --workers 1: Crucial for low-memory environments like Render's free tier.
# --threads 2: Allows the single worker to handle a couple of requests concurrently.
# --timeout 120: Increases the request timeout to 120 seconds to prevent killing slow OCR/AI tasks.
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "--threads", "2", "--timeout", "120", "app:app"]