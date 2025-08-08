# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the backend application into the container at /app
COPY . /app/

# Run the Django development server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi:application"]