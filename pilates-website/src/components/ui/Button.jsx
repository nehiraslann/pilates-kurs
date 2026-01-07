import { Link } from 'react-router-dom';

export default function Button({ children, variant = 'primary', className = '', to, ...props }) {
    const baseStyles = "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-[#d48c94] !text-white font-bold hover:bg-[#c07b83] !hover:text-white focus:ring-[#d48c94] shadow-sm",
        secondary: "bg-[#faf7f2] text-[#5c504a] border border-[#e6dccf] hover:bg-[#f2efe9] focus:ring-[#d48c94]",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
        ghost: "text-[#5c504a] hover:bg-[#f2efe9] hover:text-[#4a4036]",
        outline: "border-2 border-[#d48c94] text-[#d48c94] hover:bg-[#fff0f3]"
    };

    const combinedClassName = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

    if (to) {
        return (
            <Link to={to} className={combinedClassName} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
}
