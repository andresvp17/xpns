import { ComponentProps, useState, useRef } from "react"
import { SolidButton } from "../buttons/buttons"
import { FilterIcon } from "../icons"

interface Props {
    children: React.ReactNode
}

type MenuItemProps = ComponentProps<"button">

const DropDownMenu = ({ children }: Props) => {
    const [open, setOpen] = useState(false)
    const buttonRef = useRef(null)


    const handleClick = () => {
        setOpen(!open)
    }

    return(
        <div className="relative">
            <SolidButton ref={buttonRef} className="flex items-center justify-center" onClick={handleClick} size="md">Filter <FilterIcon /></SolidButton>
            {open && 
                <ul className="absolute -bottom-2 left-0 translate-y-[100%] rounded-md py-[5px] bg-primary z-10">
                    {children}
                </ul>
            }
        </div>
    )
}

const DropDownItem = ({ ...props }: MenuItemProps) => {
    return(
        <li role="menuItem">
            <button {...props} className="w-full text-left py-1.5 px-2 text-black font-semibold bg-primary md:hover:brightness-90" type="button" />
        </li>
    )
}

export {
    DropDownMenu,
    DropDownItem
}