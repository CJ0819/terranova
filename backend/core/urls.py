# core/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # ── Public ──────────────────────────────
    path('jobs/', views.JobListView.as_view(), name='job-list'),
    path('jobs/<int:pk>/', views.JobDetailView.as_view(), name='job-detail'),
    path('jobs/<int:pk>/apply/', views.ApplyView.as_view(), name='job-apply'),
    path('departments/', views.DepartmentListView.as_view(), name='department-list'),

    # ── Admin ────────────────────────────────
    path('admin/stats/', views.AdminStatsView.as_view(), name='admin-stats'),
    path('admin/jobs/', views.AdminJobListCreateView.as_view(), name='admin-job-list'),
    path('admin/jobs/<int:pk>/', views.AdminJobDetailView.as_view(), name='admin-job-detail'),
    path('admin/applications/', views.AdminApplicationListView.as_view(), name='admin-applications'),
    path('admin/applications/<int:pk>/', views.AdminApplicationDetailView.as_view(), name='admin-application-detail'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('admin/contacts/', views.AdminContactListView.as_view(), name='admin-contacts'),
    path('admin/contacts/<int:pk>/', views.AdminContactDetailView.as_view(), name='admin-contact-detail'),
]


