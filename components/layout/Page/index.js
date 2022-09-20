import Header from './Header';
import Description from './Description';
import Column from './List';
import Block from './Block';

function Content({ children }){
    return <>{children}</>
}

const Modules = { Content, Header, Description, Column, Block }

export default Modules