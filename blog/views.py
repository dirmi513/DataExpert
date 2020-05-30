from .models import BlogPost
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.generics import GenericAPIView
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
            return Response('Success', status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'There was an error: {e}', status=status.HTTP_400_BAD_REQUEST)


class GetBlogPostContent(GenericAPIView):
    """Return's a certain blog post's content.
    """
    permission_classes = (IsAdminUser, ) 

    def get(self, request):
        try:
            data = request.data
            if 'title' not in data and 'author' not in data:
                return Response(f'Title and/or author missing.', status=status.HTTP_400_BAD_REQUEST)
            blog_post_instance = BlogPost.objects.get(author=data['author'], title=data['title'])
            content = blog_post_instance.get_content()
            return Response(content, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'There was an error: {e}', status=status.HTTP_400_BAD_REQUEST)
