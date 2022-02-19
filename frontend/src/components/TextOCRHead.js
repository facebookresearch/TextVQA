import React from "react";
import { Helmet } from "react-helmet";

const TextOCRHead = (props) => {
    return (
        <div>
            <Helmet>
                <title>TextOCR</title>

                <meta charset="utf-8" />
                <link rel="shortcut icon" href="/assets/images/textocr/logo_only.png?v=2" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="theme-color" content="#000000" />

                <meta property="og:title" content="TextOCR" />
                <meta property="og:description" content="A dataset for arbitrary shaped text recognition on natural images" />
                <meta property="og:image" content="https://textvqa.org/assets/images/textocr/logo_horizontal_color_with_text.png" />
                <meta property="og:url" content="https://textvqa.org/textocr" />
                <meta property="og:site_name" content="TextOCR" />

                <meta name="twitter:title" content="TextOCR" />
                <meta name="twitter:description" content="A dataset for arbitrary shaped text recognition on natural images" />
                <meta name="twitter:image" content="https://textvqa.org/assets/images/textocr/logo_horizontal_color_with_text.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image:alt" content="A dataset for arbitrary shaped text recognition on natural images" />
            </Helmet>
        </div>
    );
};

export default TextOCRHead;