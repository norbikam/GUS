import Image from "next/image";

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
            <li className="pb-2"><a href="/katalog">Sklep</a></li>
            <li className="pb-2"><a href="/kontakt">Kontakt</a></li>
            <li><a href="/onas">O nas</a></li>
        </ul>
        <ul className="pt-10 md:pt-0">
            <li className="pb-4 text-xl">Sklep</li>
            <li className="pb-2"><a href="/kontakt">Morpheus - 8</a></li>
            <li className="pb-2"><a href="/onas">Frax Ultra Laser Frakcyjny</a></li>
            <li className="pb-2"><a href="/kontakt">HiFUSONIX + Liposonix</a></li>
            <li><a href="/kontakt">VENOM</a></li>
        </ul>
    </footer>
    );
}