import os
import sys

try:
    dirs = [
        'backend/config',
        'backend/api/services',
        'backend/api/migrations',
        'frontend/src/app',
        'frontend/src/redux/actions',
        'frontend/src/redux/reducers',
        'frontend/src/redux/constants',
        'frontend/src/screens/LoginScreen',
        'frontend/src/screens/RegisterScreen',
        'frontend/src/screens/HomeScreen',
        'frontend/src/components/FormComponent',
        'frontend/src/components/Loader',
        'frontend/src/components/Message',
        'frontend/src/components/ConversationItem',
        'frontend/src/components/EmptyState',
        'frontend/src/services',
        'frontend/public'
    ]

    for d in dirs:
        os.makedirs(d, exist_ok=True)
        print(f'Created: {d}')

    print('\nProject structure created successfully')
except Exception as e:
    print(f'Error: {e}', file=sys.stderr)
    sys.exit(1)
