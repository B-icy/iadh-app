import BasicCard from './employeeCard';
import Box, { BoxProps } from '@mui/material/Box';

export default function AllCards(props) {

    return (
        <div style={{ maxWidth: '100%' }}>
            <Box id="allCards"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap', 
                    maxWidth: 9/10,
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}>
                {props.data['query'].map(item => (
                <BasicCard name={item.name} key={item.id} position={item.position} salary={item.salary} daysWorked={item.daysWorked} uid={item.id}/>
            ))}
            </Box>
        </div>
    )
}