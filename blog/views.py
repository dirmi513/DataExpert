from .models import BlogPost
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework import status
from .serializers import BlogPostSerializer, UpdateBlogPostSerializer
from rest_framework.response import Response  


class NewBlogPost(GenericAPIView):
    """Create a new blog post.
    """
    permission_classes = (IsAdminUser, )
    serializer_class = BlogPostSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True) 
            serializer.save()
            return Response('The blog post was created successfully.', status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(f'There was an error {e}', status=status.HTTP_400_BAD_REQUEST)


class UpdateBlogPostContent(GenericAPIView):
    """Update a blog post's content.
    """
    permission_classes = (IsAdminUser, )
    serializer_class = UpdateBlogPostSerializer

    def post(self, request):
        try:
            data = request.data
            blog_post_instance = BlogPost.objects.get(id=data['id'])
            serializer = self.serializer_class(blog_post_instance, data=request.data)
            serializer.is_valid(raise_exception=True) 
            serializer.save()
            return Response('Successfully updated the blog post\'s content', status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'There was an error updating the blog post: {str(e)}', status=status.HTTP_400_BAD_REQUEST)


class GetBlogPostContent(ListAPIView):
    """Return's a certain blog post's content.

    You must specify the title and author as parameters when hitting the REST endpoint:
        e.g. http://localhost:8000/blog/api/get-slide-content?title=test&author=1
    """
    permission_classes = (IsAdminUser, )
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        title = self.request.query_params.get('title')
        author = self.request.query_params.get('author')
        if not title or not author:
            return None
        self.queryset = BlogPost.objects.filter(author=author, title=title)
        return self.queryset

    def get(self, request, *args, **kwargs):
        data = self.get_queryset()
        if not data:
            error_message = 'Title and/or author missing from request.'
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data.values('content')[0], status=status.HTTP_200_OK)
