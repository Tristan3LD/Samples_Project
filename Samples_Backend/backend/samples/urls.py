from django.urls import path
from . import views

urlpatterns = [
    path('sample/<str:sample_id>/', views.get_sample, name='get_sample'),
    path('sample/submit/', views.submit_sample, name='submit_sample'),
]