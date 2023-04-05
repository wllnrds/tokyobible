import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import styles from './Page.module.scss';



const serializers = {
    marks: {
        internalLink: ({ value, children }) => {
            let href = null

            switch (value.ref_type) {
                case 'rule':
                    href = `/${ value.type_slug }/${ value.slug }`
                    break;
                case 'source':
                    href = `/content/${ value.slug }`
                    break;
                default:
                    break;
            }

            if(href){
                return <Link href={ href }>{ children }</Link>
            }else{
                return children
            }
        }
    }
}

export default function Description( props ){
    return <article className={ styles.description }>
        { props.value && <PortableText { ...props } components={ serializers } /> }
        { props.children }
    </article>
}