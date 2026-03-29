from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Job, Application, Department, ContactMessage
from .serializers import (
    JobListSerializer, JobDetailSerializer,
    ApplicationSerializer, DepartmentSerializer, ContactSerializer
)


# ─── Public Views ────────────────────────────────────────────────

class JobListView(generics.ListAPIView):
    serializer_class = JobListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Job.objects.filter(status='active')
        dept = self.request.query_params.get('department')
        job_type = self.request.query_params.get('job_type')
        if dept:
            qs = qs.filter(department__id=dept)
        if job_type:
            qs = qs.filter(job_type=job_type)
        return qs


class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.filter(status='active')
    serializer_class = JobDetailSerializer
    permission_classes = [permissions.AllowAny]


class ApplyView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.AllowAny]


class DepartmentListView(generics.ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.AllowAny]


class ContactView(generics.CreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny]


# ─── Admin Views ─────────────────────────────────────────────────

class AdminJobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobDetailSerializer
    permission_classes = [permissions.IsAdminUser]


class AdminJobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobDetailSerializer
    permission_classes = [permissions.IsAdminUser]


class AdminApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        qs = Application.objects.all()
        job_id = self.request.query_params.get('job')
        status_filter = self.request.query_params.get('status')
        if job_id:
            qs = qs.filter(job__id=job_id)
        if status_filter:
            qs = qs.filter(status=status_filter)
        return qs


class AdminApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):  # ← added Destroy
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAdminUser]


class AdminStatsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return Response({
            'total_jobs': Job.objects.count(),
            'active_jobs': Job.objects.filter(status='active').count(),
            'total_applications': Application.objects.count(),
            'pending_applications': Application.objects.filter(status='pending').count(),
            'departments': Department.objects.count(),
        })


class AdminContactListView(generics.ListAPIView):
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = ContactMessage.objects.all().order_by('-sent_at')


class AdminContactDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = ContactMessage.objects.all()