import Link from "next/link";

export default function Footer() {
    return (
    <footer className="grid grid-cols-1 md:grid-cols-3 items-center justify-center py-10 bg-gray-800/20 px-10 text-left md:text-center z-50">
        <ul className="md:text-left md:pl-10">
            <li>Robert Morawski</li>
            <li>ul. Perłowa 13a</li>
            <li>76-270 Ustka</li>
            <li></li>
            <li>Czynne: pn-pt 10:00-20:00</li>
        </ul>
        <ul className="pt-10 md:pt-0">
            <li className="pb-4 text-xl">Menu</li>
            <li className="pb-2"><Link href="/katalog">Sklep</Link></li>
            <li className="pb-2"><Link href="/kontakt">Kontakt</Link></li>
            <li><Link href="/onas">O nas</Link></li>
        </ul>
        <ul className="hidden md:block md:pt-0 text-left md:text-right md:pr-10">
            <li className="pb-4 text-xl">Social media</li>
            <li className="pb-2"><a href="https://www.facebook.com/GlowUpSkinPolska/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li className="pb-2"><a href="https://www.instagram.com/glowupskinpl" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://api.whatsapp.com/send/?phone=48510255279&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
        </ul>
    </footer>
    );
}