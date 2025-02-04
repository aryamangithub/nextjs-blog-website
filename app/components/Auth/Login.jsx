"use-client"

export default function Login() {
    return (
        <section>
            <button 
                className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100"
                onClick={() => Router.push('/login')}
            >
                Sign in
            </button>
        </section>
    )
}