currentYear=$(date +"%Y")

mkdir -p ./dist

cd ./apps/2023

ls -all

# Copy build files of each year to root
find "apps" -maxdepth 1 -mindepth 1 -type d | while read -r year; do
    year=$(basename "$year")
    echo $year;
    cp ./apps/$year/dist -rf ./dist/$year
    if [ "$year" -eq "$currentYear" ]; then
        cp ./dist/$year/** -rf ./dist
        #rm ./dist/$year -rf
    fi
done

# If website for current year doesn't exist in apps, copy build files of previous year to root
if [ ! -d "./apps/$currentYear" ]; then
    previousYear=$(($currentYear - 1))
    cp ./dist/$previousYear/** -rf ./dist
    #rm ./dist/$previousYear -rf
fi