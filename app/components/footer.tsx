import Link from "next/link";

export default function Footer() {
    return (
    <footer className="grid grid-cols-1 md:grid-cols-3 items-center justify-center py-10 bg-gray-800/20 px-10 md:px-100 text-left md:text-center">
        <ul>
            <li>Robert Morawski</li>
            <li>ul. Perłowa 13a</li>
            <li>76-270 Ustka</li>
            <li></li>
            <li>Czynne: pn-pt 10:00-20:00</li>
            <li>tel. +48 510 255 279</li>
            <li>email: glowupskinpl@gmail.com</li>
        </ul>
        <ul className="pt-10 md:pt-0">
            <li className="pb-4 text-xl">Menu</li>
            <li className="pb-2"><Link href="/katalog">Sklep</Link></li>
            <li className="pb-2"><Link href="/kontakt">Kontakt</Link></li>
            <li><Link href="/onas">O nas</Link></li>
        </ul>
        <ul className="pt-10 md:pt-0">
            <li className="pb-4 text-xl">Sklep</li>
            <li className="pb-2"><Link href="/kontakt">Morpheus - 8</Link></li>
            <li className="pb-2"><Link href="/onas">Frax Ultra Laser Frakcyjny</Link></li>
            <li className="pb-2"><Link href="/kontakt">HiFUSONIX + Liposonix</Link></li>
            <li><Link href="/kontakt">VENOM</Link></li>
        </ul>
    </footer>
    );
}