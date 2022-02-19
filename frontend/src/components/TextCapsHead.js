import React from "react";
import { Helmet } from "react-helmet";

const TextCapsHead = (props) => {
    return (
        <div>
            <Helmet>
                <title>TextCaps</title>

                <meta charset="utf-8" />
                <link rel="shortcut icon" href="/assets/images/textcaps_favicon.png?v=2" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="theme-color" content="#000000" />

                <meta property="og:title" content="TextCaps" />
                <meta property="og:description" content="A dataset to benchmark image captioning based on text in images." />
                <meta property="og:image" content="https://textvqa.org/assets/images/textcaps_logo_and_text.png" />
                <meta property="og:url" content="https://textvqa.org/textcaps" />
                <meta property="og:site_name" content="TextCaps" />

                <meta name="twitter:title" content="TextCaps" />
                <meta name="twitter:description" content="A dataset to benchmark image captioning based on text in images." />
                <meta name="twitter:image" content="https://textvqa.org/assets/images/textcaps_logo_and_text.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image:alt" content="A dataset to benchmark image captioning based on text in images." />
            </Helmet>
        </div>
    );
};

export default TextCapsHead;