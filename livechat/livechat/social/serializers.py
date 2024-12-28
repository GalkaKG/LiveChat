from rest_framework import serializers
from .models import Post, Comment, Like

class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    comments_count = serializers.IntegerField(source='comments.count', read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'image', 'created_at', 'comments_count', 'likes_count']

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'post', 'user']

