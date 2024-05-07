import './Layout.css'

interface Layout{
    PageLeft? : any;
    PageRight? : any;
}

export const Layout = ({PageLeft, PageRight}:Layout) => {
    return (
        <div className="layout">
            <div className="contain">
                <div className="left">
                    {PageLeft}
                </div>
                <div className="right">
                    {PageRight}
                </div>
            </div>
        </div>
    )
}