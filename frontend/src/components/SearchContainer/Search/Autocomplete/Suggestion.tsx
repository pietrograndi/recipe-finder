import { Ingredient, Recipe } from "@/types/interface"
import styles from './style.module.css'
import cx from 'classnames'
import { stringMatcher } from "./utils"

interface SuggestionProps {
  suggestion: Ingredient | Recipe
  type: 'ingredient' | 'recipe'
  onSelect: (subject: Ingredient | Recipe, type: 'ingredient' | 'recipe') => void
  searchTerm: string
}

export const Suggestion = (props: SuggestionProps) => {
  const {name, description} = props.suggestion
  const matchList = stringMatcher(name, props.searchTerm)
  
  const matchDescription = props.searchTerm ? 
    `Corrispondenza trovata tra : ${props.searchTerm} in ${name}` : 
    name;
  return (
    <div
      className={cx(styles.suggestion, { [styles.green]: props.type === 'ingredient' })}
      tabIndex={-1}
      role="option"
      aria-selected="false"
      onClick={() => props.onSelect(props.suggestion, props.type)}
      onKeyDownCapture={(e) => {
        if (e.key === 'Enter') {
          props.onSelect(props.suggestion, props.type)
        }
      }}
    >
      <span className={styles.visuallyHidden}>
        {matchDescription}
      </span>
      
      <p aria-hidden="true">
        {matchList.map(({label, isMatch}, idx) => (
          <span 
            key={`label-${idx}`} 
            className={cx(styles.label, { [styles.match]: isMatch })}
          >
            {label}
          </span>
        ))}
      </p>
      <span className={styles.description}>{description}</span>
    </div>
  )
}
