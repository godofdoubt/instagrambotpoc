# C:\Users\Mert\Desktop\instabot\backend\content_generator\urls.py

from django.urls import path
# We only import the view that is currently active.
from .views import GenerateContentAPIView

urlpatterns = [
    # This is the main endpoint for generating content.
    path('generate/', GenerateContentAPIView.as_view(), name='generate-content'),

    # We are commenting out these lines because the views they point to
    # (SavedContentListView and SavedContentDetailView) are commented out in views.py.
    # We can re-enable these later when we build the content library feature.
    # path('library/', SavedContentListView.as_view(), name='saved-content-list'),
    # path('library/<int:pk>/', SavedContentDetailView.as_view(), name='saved-content-detail'),
]