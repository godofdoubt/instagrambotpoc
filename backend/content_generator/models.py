from django.db import models

class GeneratedContent(models.Model):
    content_type = models.CharField(max_length=50)
    input_text = models.TextField()
    generated_text = models.TextField()
    generated_image_prompt = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.content_type} - {self.created_at.strftime('%Y-%m-%d')}"