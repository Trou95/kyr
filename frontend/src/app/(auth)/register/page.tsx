import Link from 'next/link';
import RegisterForm from '../../../components/(pages)/register/register-form';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Kayıt Ol</h2>
        </div>
        <RegisterForm />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Zaten hesabınız var mı?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              Giriş yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
