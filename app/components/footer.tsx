import Link from "next/link";

export default function Footer() {
    return (
    <footer className="grid grid-cols-1 md:grid-cols-3 items-center justify-center py-10 bg-gray-800/20 px-10 text-left md:text-center z-50">
        <ul className="md:text-left md:pl-10">
            <li>GlowUpSkin Medic</li>
            <li>Telefon: +48 510 255 279</li>
            <li>NIP: 8392556623</li>
            <li>REGON: 529440726</li>
        </ul>
        <ul className="pt-10 md:pt-0">
            <li className="pb-4 text-xl">Menu</li>
            <li className="pb-2"><Link href="/katalog">Sklep</Link></li>
            <li className="pb-2"><Link href="/kontakt">Kontakt</Link></li>
            <li><Link href="/onas">O nas</Link></li>
        </ul>
        <ul className="pt-10 md:pt-0 md:text-right md:pr-10">
            <li className="pb-4 text-xl">Social media</li>
            <li className="pb-2">
                <Link href="https://www.facebook.com/GlowUpSkinPolska/" aria-label="Facebook">
                    Facebook
                </Link>
            </li>
            <li className="pb-2">
                <Link href="https://www.instagram.com/glowupskinpl" aria-label="Instagram">
                    Instagram
                </Link>
            </li>
            <li>
                <Link href="https://www.youtube.com/@GlowUpSkinpl" aria-label="YouTube">
                    YouTube
                </Link>
            </li>
        </ul>
        <div className="col-span-1 md:col-span-3 text-center mt-10 text-gray-400">
            &copy; {new Date().getFullYear()} GlowUpSkin Medic. Wszelkie prawa zastrzeżone. <br />
            Projekt i realizacja: <a href="https://nokdesign.pl" className="text-gray-400 underline" target="_blank" rel="noopener noreferrer">NOK Design</a>
        </div>
    </footer>
    );
}
