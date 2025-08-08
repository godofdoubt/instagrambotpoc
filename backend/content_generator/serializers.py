from rest_framework import serializers
from .models import GeneratedContent

class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedContent
        fields = '__all__'