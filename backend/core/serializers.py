from rest_framework import serializers
from .models import Job, Application, Department, ContactMessage


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']


class JobListSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    application_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'department', 'department_name',
            'location', 'job_type', 'status', 'deadline',
            'created_at', 'application_count',
        ]


class JobDetailSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    application_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            'id', 'job', 'job_title', 'first_name', 'last_name',
            'email', 'phone', 'cover_letter', 'resume', 'resume_url',
            'status', 'applied_at',
        ]
        read_only_fields = ['applied_at']

    def get_resume_url(self, obj):
        if obj.resume:
            return f"http://localhost:8000/media/{obj.resume}"
        return None

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'sent_at']
        read_only_fields = ['sent_at']