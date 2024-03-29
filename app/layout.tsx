import React from "react";
import Header from "./Header";
import { Analytics } from '@vercel/analytics/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

function RootLayout({
    children,
}: {
    children: React.ReactNode
}){
    const date: any = new Date();
    const currentYear = date.getFullYear();

    return(
        <html>
            <head>
            <title>Learn Geo</title>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
                integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
                crossOrigin=""/>
            <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Edu+NSW+ACT+Foundation:wght@700&family=Outfit:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"/>
            </head>
            <body className="body">
                <div className="container-all">
                    <Header/>
                    {children}
                    <Analytics />
                    <footer className="footer"><a>&copy; Learn Geo - {currentYear}</a></footer>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
                <script src="https://kit.fontawesome.com/a62fd80284.js" crossOrigin="anonymous"></script>
            </body>

        </html>

    )
}

export default RootLayout;