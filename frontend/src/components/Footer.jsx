export default function Footer() {
    return (
        <footer className="border-t border-earth-800/30 py-12 px-6 text-center">
            <p className="font-display text-lg font-bold text-earth-300 mb-2">
                TERRA<span className="text-[#f5f0e8]">NOVA</span>
            </p>
            <p className="font-body text-sm text-[#a09890]">
                © {new Date().getFullYear()} TerraNova Mining Ltd. All rights reserved.
            </p>
            <p className="font-body text-xs text-[#6b6560] mt-1">Accra, Ghana</p>
        </footer>
    )
}
