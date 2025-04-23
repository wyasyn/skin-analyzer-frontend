import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary py-8 mt-auto">
      <div className="wrapper flex items-center justify-between py-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Aurora Organics Inc.</p>
        <p>Made with ❤️ by Cavendish University Uganda</p>
      </div>
      <div className="wrapper flex items-center justify-between py-4 text-sm text-muted-foreground">
        <Link href="/privacy-policy" className="hover:underline duration-300">
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="hover:underline duration-300">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
