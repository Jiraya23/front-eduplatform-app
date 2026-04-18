
function Navbar() {
    const [isOpen, setIsOpen] = useState('false');

    return (
    <nav className="bg-white shadow-md">    
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-green-600">EduPlattform</div>
            <div className="hidden md:flex space-x-4">
            </div>
        </div>
    </nav>
    )
}

export default Navbar
