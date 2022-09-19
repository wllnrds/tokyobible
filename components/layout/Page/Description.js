import { PortableText } from '@portabletext/react';
import styles from './Page.module.scss';

export default function Description( props ){
    return <article className={ styles.description }>
        { props.value && <PortableText { ...props } /> }
    </article>
}