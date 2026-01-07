export default function ProgressBar({ progress }) {
    return (
        <div className="w-full bg-[#e6dccf] rounded-full h-2.5">
            <div
                className="bg-[#d48c94] h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
        </div>
    );
}
