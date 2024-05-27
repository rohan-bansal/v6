import { VisuallyHidden } from "../visually_hidden/visuallyHidden";
import { useSpring } from "framer-motion";
import { memo, useEffect, useRef } from "react";
// import { classes } from "../../../style";
import styles from "./decoder-text.module.css";

function classes(...classes) {
  return classes.filter(Boolean).join(" ");
}

// prettier-ignore
const glyphs = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ', 'ー',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン',
  'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
  'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
  'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
  'バ', 'ビ', 'ブ', 'ベ', 'ボ',
  'パ', 'ピ', 'プ', 'ペ', 'ポ',
];

const CharType = {
  Glyph: "glyph",
  Value: "value",
};

function shuffle(content, output, position) {
  return content.map((value, index) => {
    if (index < position) {
      return { type: CharType.Value, value };
    }

    if (position % 1 < 0.5) {
      const rand = Math.floor(Math.random() * glyphs.length);
      return { type: CharType.Glyph, value: glyphs[rand] };
    }

    return { type: CharType.Glyph, value: output[index].value };
  });
}

export const DecoderText = memo(
  ({ text, start = true, startDecoding = false, className, ...rest }) => {
    const output = useRef([{ type: CharType.Glyph, value: "" }]);
    const container = useRef();
    const decoderSpring = useSpring(0, { stiffness: 8, damping: 5 });

    useEffect(() => {
      if (startDecoding) {
        decoderSpring.jump(0);
        decoderSpring.set(text.split("").length);
      }
    }, [startDecoding]);

    useEffect(() => {
      const containerInstance = container.current;
      const content = text.split("");
      let animation;

      const renderOutput = () => {
        const characterMap = output.current.map((item) => {
          return `<span class="${styles[item.type]}">${item.value}</span>`;
        });

        containerInstance.innerHTML = characterMap.join("");
      };

      const unsubscribeSpring = decoderSpring.on("change", (value) => {
        output.current = shuffle(content, output.current, value);
        renderOutput();
      });

      const startSpring = async () => {
        decoderSpring.set(content.length);
      };

      if (start && !animation) {
        startSpring();
      }

      return () => {
        unsubscribeSpring?.();
      };
    }, [decoderSpring, start, text]);

    start = true;

    return (
      <span className={classes(styles.text, className)} {...rest}>
        <VisuallyHidden className={styles.label}>{text}</VisuallyHidden>
        <span aria-hidden className={styles.content} ref={container} />
      </span>
    );
  }
);
