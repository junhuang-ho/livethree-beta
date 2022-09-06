import Tooltip from '@mui/material/Tooltip';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

export const IconGas = () => {

    return (
        <Tooltip title="this action uses MATIC (gas)">
            <LocalGasStationIcon fontSize="small" />
        </Tooltip>
    )
}
