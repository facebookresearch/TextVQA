import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const TextVQAHead = (props) => {
    const type = useLocation().pathname.indexOf("textcaps") === -1 ? "textvqa" : "textcaps";

    if (type === "textcaps") {
        return (
            <div>
                <Helmet>
                    <meta charset="utf-8"/>
                </Helmet>
            </div>
        );

    }
    return (
        <div>
            <Helmet>
                <title>TextVQA</title>

                <meta charset="utf-8" />
                <link rel="shortcut icon" href="/assets/images/textvqa_favicon.png?v=2" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="theme-color" content="#000000" />

                <meta property="og:title" content="TextVQA"/>
                <meta property="og:description" content="A dataset to benchmark visual reasoning based on text in images."/>
                <meta property="og:image" content="https://textvqa.org/assets/images/textvqa_teaser.png"/>
                <meta property="og:url" content="https://textvqa.org"/>
                <meta property="og:site_name" content="TextVQA"/>

                <meta name="twitter:title" content="TextVQA"/>
                <meta name="twitter:description" content="A dataset to benchmark visual reasoning based on text in images."/>
                <meta name="twitter:image" content="https://textvqa.org/assets/images/textvqa_teaser.png"/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:image:alt" content="A dataset to benchmark visual reasoning based on text in images."/>
            </Helmet>
        </div>
    );
};

export default TextVQAHead;