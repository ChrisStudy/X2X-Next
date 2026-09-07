export default function Custom404() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-gray-400 mb-8">
                The page you are looking for does not exist or may have been moved.
            </p>
            <a href="/" className="hover-underline text-primary">
                ← Back to Home
            </a>
        </div>
    );
}

Custom404.pageTitle = "Page Not Found";