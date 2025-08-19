import Link from 'next/link';
import LoginForm from '../../../components/(pages)/login/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Giriş Yap</h2>
        </div>
        <LoginForm />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Hesabınız yok mu?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-500">
              Kayıt ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
