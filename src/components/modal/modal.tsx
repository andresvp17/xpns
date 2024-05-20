import { forwardRef, Dispatch, SetStateAction } from "react";
import { SolidButton } from "../buttons/buttons";

interface ModalProps {
    show: boolean
    onClose: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode
}

// eslint-disable-next-line react/display-name
export const Modal = forwardRef<
HTMLDivElement,
ModalProps
>(
    ({ show, onClose, children, ...props }, ref) => {        
    return (
        show && <>
        <div className="w-full h-screen fixed top-0 left-0 flex flex-col items-center justify-center z-20 backdrop-brightness-[0.3] backdrop-blur-sm" ref={ref} {...props}>
            <SolidButton className="absolute top-16 left-14" onClick={() => onClose(false)} size="sm">X</SolidButton>
            {children}
        </div>
        </> 
    )
})