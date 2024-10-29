export const optionsStyles = (error: any, borderColor: boolean = false) => {
    const style = {
        control: (provided: any, state: any) => ({
            ...provided,
            minHeight: '36px',
            height: '36px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px',
            outline: 'none',
            border: `1px solid ${
                error && borderColor ? 'red' : state.isFocused ? '#9CA3AF' : '#E5E7EB'
            }`,
            boxShadow: 'none',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            ':hover': {
            borderColor: `${!error && '#E5E7EB'}`
            }
            }),
            option: (provided: any, state: any) => ({
                ...provided,
                backgroundColor: state.isSelected
                    ? '#723EEB'
                    : 'white',
                '&:hover': {
                    backgroundColor: !state.isSelected
                        ? '#e5e5ec'
                        : ''
                }
            }),
        valueContainer: (provided: any) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center'
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 9999,
            fontSize: '12px'
        }),
        indicatorsContainer: (provided: any) => ({
            ...provided,
            paddingRight: '10px'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            padding: '0',
            width: '13px'
        })
    }
    return style
}