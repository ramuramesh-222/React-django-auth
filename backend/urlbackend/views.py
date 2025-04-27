# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth.models import User
# from rest_framework.permissions import AllowAny

# class RegisterView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         name = request.data.get('name')
#         username = request.data.get('username')
#         password = request.data.get('password')


#         if not username or not password:
#             return Response({'error': 'Please provide username and password'}, status=status.HTTP_400_BAD_REQUEST)

#         if User.objects.filter(username=username).exists():
#             return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

#         user = User.objects.create_user(name=name, username=username, password=password)
#         user.save()

#         return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth.models import User
# from rest_framework.permissions import IsAuthenticated


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Please provide username and password'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        
        if name:
            user.first_name = name 
        user.save()

        if email:
            user.email = email 
        user.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


class UserListView(APIView):
    permission_classes = [IsAuthenticated]  # Only logged-in users can access
    # permission_classes = [AllowAny]


    def get(self, request):
        users = User.objects.all()
        user_data = [
            {
                'id': user.id,
                'username': user.username,
                'name': user.first_name,
            }
            for user in users
        ]
        return Response(user_data, status=status.HTTP_200_OK)