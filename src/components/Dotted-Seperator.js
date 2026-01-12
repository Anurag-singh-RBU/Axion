import { cn } from "@/lib/utils";

DottedSeparator.defaultProps = {
    color: "currentColor",
    height: 2,
    gapSize: 4,
    dotSize: 2,
    direction: "horizontal",
};

export function DottedSeparator({
    className,
    color = "currentColor",
    height = 2,
    gapSize = 4,
    dotSize = 2,
    direction = "horizontal",
    ...props
}) {
    const isHorizontal = direction === "horizontal";
    const lengthStyle = isHorizontal
        ? { width: "100%", height: `${height}px` }
        : { height: "100%", width: `${height}px` };

    const dotDimension = `${dotSize}px`;
    const gapDimension = `${gapSize}px`;
    const borderRadius = dotSize / 2;

    const backgroundImage = `repeating-linear-gradient(${
        isHorizontal ? "to right" : "to bottom"
    }, ${color}, ${color} ${dotDimension}, transparent ${dotDimension}, transparent calc(${dotDimension} + ${gapDimension}))`;

    return (
        <div className={cn("w-full flex items-center my-2", className)} {...props}>
        <div style={{ ...lengthStyle, backgroundImage, backgroundRepeat: "repeat", borderRadius, opacity: 0.5 }}/>
        </div>
    );
}
