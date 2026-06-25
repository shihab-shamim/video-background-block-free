import { useState } from "react";

const ClipBoard = ({ shortcode }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shortcode);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shortcode;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
        // console.log(err);
    }
  };

  return (
    <section
      style={{
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          boxShadow: "0px 0px 0px transparent",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: 500,
            marginBottom: "10px",
          }}
        >
          Copy this shortcode and paste it into your post, page, or text widget
          content
        </p>

        <button
          onClick={handleCopy}
          style={{
            border: "none",
            background: "rgb(69, 39, 164)",
            color: "#fff",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: "15px",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgb(69, 39, 164)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgb(69, 39, 164)")
          }
        >
          {hasCopied ? "Copied Shortcode!" : shortcode}
        </button>
      </div>
    </section>
  );
};

export default ClipBoard;

