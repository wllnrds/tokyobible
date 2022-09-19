import Header from './Header';
import Description from './Description';
import Column from './List';
import Block from './Block';

export function Content({ children }){
    return <>{children}</>
}

export default { Content, Header, Description, Column, Block }