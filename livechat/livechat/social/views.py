from rest_framework import viewsets, permissions
from .models import Post, Comment, Like
from .serializers import PostSerializer, CommentSerializer, LikeSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        print("Creating post...")
        serializer.save(author=self.request.user)
    
    def create(self, request, *args, **kwargs):
        print("Received post creation request:", request.data)
        return super().create(request, *args, **kwargs)

    http_method_names = ['get', 'post', 'head', 'options']


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-created_at')
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Задаваме текущия потребител като автор на коментара
        serializer.save(author=self.request.user)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Задаваме текущия потребител като автора на харесването
        serializer.save(user=self.request.user)
