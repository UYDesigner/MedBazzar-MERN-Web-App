import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SliderComponent(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md')); // Adjust the breakpoint for tablets if needed

    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: true,
        centerPadding: '0',
    };

    settings.slidesToShow = matches ? 1 : (isTablet ? 3 : 3);

    var banners = props.data;
    console.log('banners',banners);
    
    var images = Object.values(banners)[0]?.picture.split(",");

    const showSlide = () => {
        return images?.map((item) => {
            return (
                <div key={item}>
                    <img src={`${serverURL}/images/${item}`} style={{
                        width: '95%',
                        borderRadius: 10,
                        height: matches ? 200 :  (isTablet ? 200 : 300),
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }} />
                </div>
            );
        });
    };

    return (
        <div style={{ width: '95%' }}>
            <Slider {...settings} className="mt-[25px] mb-[10px]">
                {showSlide()}
            </Slider>
        </div>
    );
}
